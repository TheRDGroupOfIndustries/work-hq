

export default function Helpdesk({
    color,
    height = "24",
    width = "26",
  }: {
    color: string;
    height?: string;
    width?: string;
  }) {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0898 8.00024C8.3249 7.33191 8.78895 6.76835 9.3998 6.40937C10.0106 6.0504 10.7287 5.91918 11.427 6.03895C12.1253 6.15873 12.7586 6.52176 13.2149 7.06377C13.6711 7.60577 13.9209 8.29176 13.9198 9.00024C13.9198 11.0002 10.9198 12.0002 10.9198 12.0002M10.9998 16.0002H11.0098M20.9998 11.0002C20.9998 16.523 16.5226 21.0002 10.9998 21.0002C5.47695 21.0002 0.999802 16.523 0.999802 11.0002C0.999802 5.47739 5.47695 1.00024 10.9998 1.00024C16.5226 1.00024 20.9998 5.47739 20.9998 11.0002Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  )
}
