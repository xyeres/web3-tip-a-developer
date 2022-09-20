export type Memo = {
  address: string;
  timestamp: number;
  date?: Date;
  name: string;
  message: string;
};

type Props = {
  memos: Memo[];
};

const Memos = (props: Props) => {
  return (
    <>
      {props.memos.map((memo: Memo, i: number) => (
        <div
          key={i}
          className="hover:opacity-100 transition-opacity duration-200 opacity-80 w-full rounded-xl border border-neutral-300 mt-[43px] p-6 flex flex-col"
        >
          <p className="text-xl font-extralight">{memo.message}</p>
          <span className="self-end mt-3 text-[.675rem]">
            &mdash; {memo.name}
          </span>
        </div>
      ))}
    </>
  );
};

export default Memos;
