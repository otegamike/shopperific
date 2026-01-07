import "./panels.css"
interface PanelProps {
    className?: string;
    type?: string;
    id?: string;
    buttonid?: string;
    children: React.ReactNode;
}

function Panel({ className, type="default", id, children }: PanelProps) {
  return (
    <div className={`panel ${type} ${className}`} id={id}>{children}</div>
  )

}

export default Panel