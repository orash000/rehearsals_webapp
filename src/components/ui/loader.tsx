export const Loader: React.FC = () => {
  return (
    <div className="z-[100] fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-base-100">
      <span className="loading loading-dots loading-xl"></span>
    </div>
  )
}