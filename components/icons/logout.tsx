export default function Logout({
  color,
  height = "21",
  width = "21",
}: {
  color?: string;
  height?: string;
  width?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2262 3.52051H15.7174C16.6347 3.52051 17.3783 4.26408 17.3783 5.18132V15.1462C17.3783 16.0634 16.6347 16.807 15.7174 16.807H13.2262M7.41341 6.84212L4.0918 10.1637M4.0918 10.1637L7.41341 13.4854M4.0918 10.1637H14.0566"
        stroke={color}
        stroke-width="1.24561"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
