export type Memo = {
  address: string;
  timestamp: number;
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
          key={memo.timestamp.toString()}
          className="hover:opacity-100 transition-opacity duration-200 opacity-80 w-full border border-neutral-700 mt-[43px] p-6 flex flex-col"
        >
          <p className="text-xl font-extralight">{memo.message}</p>
          <span className="self-end mt-3 text-[.675rem]">
            <>&mdash; {memo.name} on {(new Date(memo.timestamp * 1000)).toLocaleDateString()}</>
          </span>
        </div>
      ))}
    </>
  );
};

export default Memos;
