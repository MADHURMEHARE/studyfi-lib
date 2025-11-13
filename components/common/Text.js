export const Text = ({
  children,
  size = "base",
  weight = "normal",
  color,
  align,
  className = "",
  ...props
}) => {
  return (
    <p
      className={(
        `text-${size}`,
        `font-${weight}`,
        color && `text-${color}`,
        align && `text-${align}`,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
