

export default function Chats({
    color,
    height = "24",
    width = "26",
  }: {
    color: string;
    height?: string;
    width?: string;
  }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={'none'} xmlns="http://www.w3.org/2000/svg">
<path d="M11.6238 21.6865C16.9734 21.6865 21.3103 17.3497 21.3103 12C21.3103 6.65032 16.9734 2.31354 11.6238 2.31354C6.27409 2.31354 1.9373 6.65032 1.9373 12C1.9373 13.5496 2.30115 15.0141 2.94805 16.3129C3.11996 16.6581 3.17718 17.0526 3.07752 17.425L2.50058 19.5813C2.25013 20.5173 3.10647 21.3736 4.04251 21.1232L6.19876 20.5463C6.57125 20.4466 6.96576 20.5039 7.31091 20.6757C8.60971 21.3227 10.0742 21.6865 11.6238 21.6865Z" stroke={color} stroke-width="1.45297"/>
<path opacity="0.5" d="M7.74919 12H7.75791M11.6151 12H11.6238M15.4897 12H15.4984" stroke={color} stroke-width="1.9373" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  )
}
