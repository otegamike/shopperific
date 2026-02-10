import LogoLoaderSvg from "../../assets/svg/LogoSvg"


function LoadingComponent({height, strokeWidth, size}: {height?: string, strokeWidth?: string, size?: number}) {
  return (
    <div className="loader center__content" style={{ height: height || "70vh", width: "100%" }}>
      <LogoLoaderSvg size={size || 40} strokeWidth={strokeWidth || "3rem"} />
    </div>
  )
}

export default LoadingComponent