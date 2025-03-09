export default function WeatherIcon({
  icon,
  className,
}: {
  icon: string;
  className: string;
}) {
  return (
    <img
      className={className}
      alt='weather icon'
      src={`https://a.hecdn.net/img/common/icon/202106d/${icon}.png`}
    />
  );
}
