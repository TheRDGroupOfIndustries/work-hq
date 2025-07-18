

export default function Payments({
    color,
    height = "24",
    width = "26",
  }: {
    color: string;
    height?: string;
    width?: string;
  }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.7977 7.7643L22.7976 7.16373H22.197H1.8008H1.20002L1.20013 7.76451L1.20133 14.1087C1.20133 14.1088 1.20133 14.1088 1.20133 14.1088C1.20139 15.1977 2.02872 16.0925 3.08944 16.2002L3.1046 16.2018L3.11983 16.2025L3.27336 16.2103L3.2885 16.2111H3.30366H20.6963C21.7852 16.2111 22.6801 15.3837 22.7878 14.323L22.7894 14.3078L22.7902 14.2926L22.7979 14.139L22.7987 14.1238L22.7987 14.1086L22.7977 7.7643ZM20.7266 1.78974L20.7115 1.78898H20.6963H3.30366C2.21477 1.78898 1.31988 2.61633 1.21216 3.67708L1.21062 3.69225L1.20985 3.70748L1.2021 3.86101L1.20134 3.87598L1.20133 3.89096L1.20013 5.96205L1.19978 6.56307H1.8008H22.197H22.7974L22.7977 5.96269L22.7987 3.8916V3.89131C22.7987 2.80242 21.9713 1.90753 20.9106 1.7998L20.8954 1.79826L20.8802 1.79749L20.7266 1.78974ZM20.6963 1.18831C22.1308 1.18831 23.3046 2.30596 23.3939 3.71751L23.3993 3.90032V14.1087C23.3993 15.5431 22.2817 16.717 20.8701 16.8063L20.6873 16.8117H3.30366C1.86924 16.8117 0.695423 15.6941 0.606142 14.2825L0.600666 14.0997V3.89131C0.600666 2.45689 1.71832 1.28307 3.12987 1.19379L3.31266 1.18831H20.6963ZM19.5119 12.5761C19.6777 12.5761 19.8122 12.7105 19.8122 12.8764C19.8122 13.0229 19.7069 13.1456 19.568 13.1716L19.4917 13.1767H16.5085C16.3427 13.1767 16.2082 13.0423 16.2082 12.8764C16.2082 12.73 16.3135 12.6072 16.4524 12.5812L16.5287 12.5761H19.5119Z" fill={color} stroke={color} strokeWidth="1.20133"/>
</svg>

  )
}
