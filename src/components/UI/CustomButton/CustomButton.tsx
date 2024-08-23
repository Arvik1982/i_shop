import styles from "./customButton.module.css";

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<{
    size: {
      width: string;
      height: string;
      color?: string;
      radius: string;
    };
    buttonname: string;
  }>;
export default function CustomButton({
  className,
  children,
  ...props
}: TProps) {
  return (
    <button
      tabIndex={1}
      onClick={() => onclick}
      onKeyDown={() => {}}
      aria-label={`${props.buttonname}`}
      {...props}
      style={{
        width: `${props.size?.width}px`,
        height: `${props.size?.height}px`,
        borderRadius: `${props.size?.radius}px`,
      }}
      className={styles.button}
    >
      {props.buttonname}
    </button>
  );
}
