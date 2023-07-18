import { Dispatch, SetStateAction } from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handler?: (event: any) => void | undefined;
};

const Input = (props: Props) => {
  const { value, setValue, handler } = props;

  if (!handler) return;

  return (
    <input
      className="h-[50px] w-full outline-none px-5 bg-grey border border-1 border-primary"
      type="text"
      placeholder="What needs to be done?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => handler(e)}
    />
  );
};

export default Input;
