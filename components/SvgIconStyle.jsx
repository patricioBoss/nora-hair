// ----------------------------------------------------------------------

export default function SvgIconStyle({ src, className, ...rest }) {
  return (
    <span
      className={"w-6 h-6 inline-block bg-current " + (className || "")}
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
      {...rest}
    />
  );
}
