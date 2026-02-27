"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const snowflakeSrc = "/weather/snow/snowflake.png";

// Settings interfaces
interface WindSettings {
  force: number;
  target: number;
  min: number;
  max: number;
  easing: number;
}

interface SnowSettings {
  count: number;
  gravity: number;
  colorAlphaMin: number;
  colorAlphaMax: number;
  sizeMin: number;
  sizeMax: number;
  scaleMin: number;
  scaleMax: number;
  distortionMin: number;
  distortionMax: number;
  brightnessMin: number;
  brightnessMax: number;
  contrastMin: number;
  contrastMax: number;
  wind: WindSettings;
  windDirectionChangeFreq: number;
  windDirectionChangeAmount: number;
  speedYMin: number;
  speedYMax: number;
  speedXMin: number;
  speedXMax: number;
  swayMax: number;
}

const GENTLE_SETTINGS: SnowSettings = {
  count: 3000,
  gravity: 20,
  colorAlphaMin: 0.2,
  colorAlphaMax: 0.6,
  sizeMin: 5,
  sizeMax: 15,
  scaleMin: 0.5,
  scaleMax: 1.5,
  distortionMin: 0.1,
  distortionMax: 0.5,
  brightnessMin: -0.1,
  brightnessMax: 0.2,
  contrastMin: 0.8,
  contrastMax: 1.2,
  wind: {
    force: 0.05,
    target: 0.05,
    min: 0.02,
    max: 0.1,
    easing: 0.002,
  },
  windDirectionChangeFreq: 0.97,
  windDirectionChangeAmount: 1.0,
  speedYMin: 0.5,
  speedYMax: 1.0,
  speedXMin: 0.2,
  speedXMax: 0.5,
  swayMax: 5,
};

const STORM_SETTINGS: SnowSettings = {
  count: 7000,
  gravity: 45,
  colorAlphaMin: 0.25,
  colorAlphaMax: 0.8,
  sizeMin: 7,
  sizeMax: 18,
  scaleMin: 0.7,
  scaleMax: 2.2,
  distortionMin: 0.2,
  distortionMax: 1.0,
  brightnessMin: -0.2,
  brightnessMax: 0.3,
  contrastMin: 0.7,
  contrastMax: 1.3,
  wind: {
    force: 0.15,
    target: 0.2,
    min: 0.08,
    max: 0.35,
    easing: 0.01,
  },
  windDirectionChangeFreq: 0.995,
  windDirectionChangeAmount: 0.2,
  speedYMin: 1.2,
  speedYMax: 2.0,
  speedXMin: 0.4,
  speedXMax: 1.0,
  swayMax: 12,
};

// Shaders
const vertexShader = `
  precision highp float;
  attribute float size;
  attribute vec3 rotation;
  attribute vec3 speed;
  attribute vec4 a_color;
  attribute float scale;
  attribute float distortion;
  attribute float brightness;
  attribute float contrast;
  attribute float rotationOffset;
  attribute float flipX;
  attribute float flipY;
  attribute float warp;
  varying vec4 v_color;
  varying float v_rotation;
  varying float v_scale;
  varying float v_distortion;
  varying float v_brightness;
  varying float v_contrast;
  varying float v_rotationOffset;
  varying float v_flipX;
  varying float v_flipY;
  varying float v_warp;
  uniform float u_time;
  uniform vec3 u_worldSize;
  uniform float u_gravity;
  uniform float u_wind;
  void main() {
    v_color = a_color;
    v_rotation = rotation.x + u_time * rotation.y;
    v_scale = scale;
    v_distortion = distortion;
    v_brightness = brightness;
    v_contrast = contrast;
    v_rotationOffset = rotationOffset;
    v_flipX = flipX;
    v_flipY = flipY;
    v_warp = warp;
    vec3 pos = position;
    pos.x = mod(pos.x + u_time + u_wind * speed.x, u_worldSize.x * 2.0) - u_worldSize.x;
    pos.y = mod(pos.y - u_time * speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;
    pos.x += sin(u_time * speed.z) * rotation.z;
    pos.z += cos(u_time * speed.z) * rotation.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (size * v_scale / gl_Position.w) * 100.0;
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_time;
  varying vec4 v_color;
  varying float v_rotation;
  varying float v_scale;
  varying float v_distortion;
  varying float v_brightness;
  varying float v_contrast;
  varying float v_rotationOffset;
  varying float v_flipX;
  varying float v_flipY;
  varying float v_warp;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    // Apply random scale
    coord *= v_scale;
    // Add random distortion based on noise and time
    float distortion_amount = v_distortion * 0.15;
    coord += vec2(
      noise(coord * 10.0 + u_time * 0.1) * distortion_amount,
      noise(coord * 10.0 + u_time * 0.1 + 1.0) * distortion_amount
    );
    // Apply warp (skew)
    coord.x += v_warp * coord.y;
    coord.y += v_warp * coord.x;
    // Apply flip
    if (v_flipX > 0.5) coord.x = -coord.x;
    if (v_flipY > 0.5) coord.y = -coord.y;
    // Apply random rotation offset
    float angle = v_rotation + v_rotationOffset;
    vec2 rotated = vec2(
      cos(angle) * coord.x + sin(angle) * coord.y,
      cos(angle) * coord.y - sin(angle) * coord.x
    ) + 0.5;
    vec4 snowflake = texture2D(u_texture, rotated);
    // Apply brightness and contrast
    vec3 color = snowflake.rgb;
    color = (color - 0.5) * v_contrast + 0.5 + v_brightness;
    color = clamp(color, 0.0, 1.0);
    gl_FragColor = vec4(color, snowflake.a * v_color.a);
  }
`;

function SnowParticles({ settings }: { settings: SnowSettings }) {
  const mesh = useRef<THREE.Points>(null);
  const texture = useLoader(THREE.TextureLoader, snowflakeSrc);

  const worldSize = useMemo<[number, number, number]>(() => [110, 110, 80], []);
  const gravity = settings.gravity;
  const wind = useRef({
    current: 0,
    force: settings.wind.force,
    target: settings.wind.target,
    min: settings.wind.min,
    max: settings.wind.max,
    easing: settings.wind.easing,
  });
  // Wind angle in radians
  const windAngle = React.useRef(0); // 0 = right, PI = left

  // Generate attributes
  const { positions, colors, sizes, rotations, speeds, scales, distortions, brightnesses, contrasts, rotationOffsets, flipXs, flipYs, warps } = useMemo(() => {
    const positions = [];
    const colors = [];
    const sizes = [];
    const rotations = [];
    const speeds = [];
    const scales = [];
    const distortions = [];
    const brightnesses = [];
    const contrasts = [];
    const rotationOffsets = [];
    const flipXs = [];
    const flipYs = [];
    const warps = [];
    for (let i = 0; i < settings.count; i++) {
      // Position
      positions.push(
        -worldSize[0] + Math.random() * worldSize[0] * 2,
        -worldSize[1] + Math.random() * worldSize[1] * 2,
        Math.random() * worldSize[2] * 2
      );
      // Speed
      speeds.push(
        settings.speedXMin + Math.random() * (settings.speedXMax - settings.speedXMin),
        settings.speedYMin + Math.random() * (settings.speedYMax - settings.speedYMin),
        Math.random() * settings.swayMax
      );
      // Rotation
      rotations.push(
        Math.random() * 2 * Math.PI,
        Math.random() * 20,
        Math.random() * 10
      );
      // Color (RGBA)
      colors.push(1, 1, 1, settings.colorAlphaMin + Math.random() * (settings.colorAlphaMax - settings.colorAlphaMin));
      // Size
      sizes.push(settings.sizeMin + Math.random() * (settings.sizeMax - settings.sizeMin));
      // Random scale
      scales.push(settings.scaleMin + Math.random() * (settings.scaleMax - settings.scaleMin));
      // Random distortion
      distortions.push(settings.distortionMin + Math.random() * (settings.distortionMax - settings.distortionMin));
      // Random brightness
      brightnesses.push(settings.brightnessMin + Math.random() * (settings.brightnessMax - settings.brightnessMin));
      // Random contrast
      contrasts.push(settings.contrastMin + Math.random() * (settings.contrastMax - settings.contrastMin));
      // Random rotation offset
      rotationOffsets.push(Math.random() * Math.PI * 2);
      // Random flip
      flipXs.push(Math.random() > 0.5 ? 1 : 0);
      flipYs.push(Math.random() > 0.5 ? 1 : 0);
      // Random warp
      warps.push(-0.3 + Math.random() * 0.6); // -0.3 to 0.3
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      sizes: new Float32Array(sizes),
      rotations: new Float32Array(rotations),
      speeds: new Float32Array(speeds),
      scales: new Float32Array(scales),
      distortions: new Float32Array(distortions),
      brightnesses: new Float32Array(brightnesses),
      contrasts: new Float32Array(contrasts),
      rotationOffsets: new Float32Array(rotationOffsets),
      flipXs: new Float32Array(flipXs),
      flipYs: new Float32Array(flipYs),
      warps: new Float32Array(warps),
    };
  }, [settings, worldSize]);

  // Uniforms
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_texture: { value: texture },
      u_worldSize: { value: worldSize },
      u_gravity: { value: gravity },
      u_wind: { value: 0 },
    }),
    [texture, gravity, worldSize]
  );

  useFrame((state, delta) => {
    // Wind logic
    const w = wind.current;
    w.force += (w.target - w.force) * w.easing;
    w.current += w.force * (delta * 0.2);
    // Wind angle logic: nudge angle
    if (Math.random() > settings.windDirectionChangeFreq) {
      // Gentle: nudge more often/larger, Storm: less often/smaller
      const nudge = (Math.random() - 0.5) * settings.windDirectionChangeAmount;
      windAngle.current += nudge;
      // Clamp angle to [-PI, PI] for stability
      if (windAngle.current > Math.PI) windAngle.current -= 2 * Math.PI;
      if (windAngle.current < -Math.PI) windAngle.current += 2 * Math.PI;
    }
    // Compute wind X (horizontal) from angle
    const windX = Math.cos(windAngle.current);
    // Optionally, you could use windY = Math.sin(windAngle.current) for vertical modulation
    uniforms.u_wind.value = w.current * windX;
    // Subtle wind change (gentle drift)
    if (Math.random() > 0.98) {
      w.target += (Math.random() - 0.5) * 0.01; // Small nudge
      w.target = Math.max(w.min, Math.min(w.max, w.target));
    }
    // Occasional strong/random wind change
    if (Math.random() > 0.995) {
      w.target = (w.min + Math.random() * (w.max - w.min)) * (Math.random() > 0.5 ? -1 : 1);
    }
    uniforms.u_time.value = state.clock.getElapsedTime();
  });

  return (
    <points ref={mesh} key={settings.count + '-' + settings.gravity}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-a_color"
          args={[colors, 4]}
          count={colors.length / 4}
          itemSize={4}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={sizes.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-rotation"
          args={[rotations, 3]}
          count={rotations.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-speed"
          args={[speeds, 3]}
          count={speeds.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
          count={scales.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-distortion"
          args={[distortions, 1]}
          count={distortions.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-brightness"
          args={[brightnesses, 1]}
          count={brightnesses.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-contrast"
          args={[contrasts, 1]}
          count={contrasts.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-rotationOffset"
          args={[rotationOffsets, 1]}
          count={rotationOffsets.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-flipX"
          args={[flipXs, 1]}
          count={flipXs.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-flipY"
          args={[flipYs, 1]}
          count={flipYs.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-warp"
          args={[warps, 1]}
          count={warps.length}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
      />
    </points>
  );
}

interface SnowEffectProps {
  type?: 'gentle' | 'storm';
}

export default function SnowEffect({ type = 'gentle' }: SnowEffectProps) {
  const settings = type === 'storm' ? STORM_SETTINGS : GENTLE_SETTINGS;
  
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* 
          Using z-index 0 and pointer-events-none so it doesn't block interaction 
          but overlays or underlays correctly. The user will place this in a relative container.
      */}
      <Canvas camera={{ position: [0, 0, 200], fov: 75 }}>
        <SnowParticles settings={settings} />
      </Canvas>
    </div>
  );
}
