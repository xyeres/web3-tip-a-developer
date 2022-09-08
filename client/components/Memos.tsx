export type Memo = {
  msg: string;
  author: string;
  amount: string;
};

type Props = {
  memos: Memo[];
};

const Memos = (props: Props) => {
  return (
    <>
      {props.memos.map((memo: Memo, i:number) => (
        <div
          key={i}
          className="opacity-80 w-full rounded-xl border border-neutral-300 mt-[43px] p-6 flex flex-col"
        >
          <p className="text-xl font-extralight">{memo.msg}</p>
          <span className="self-end mt-3 text-[.675rem]">
            &mdash; {memo.author} with {memo.amount}
          </span>
        </div>
      ))}
    </>
  );
};

export default Memos;
