interface IProps {
  message?: string;
}

export default function NoDataFoundComponent({ message }: IProps) {
  return (
    <p className="text-3xl text-center font-medium">
      {message ?? "No Post Availeble"}
    </p>
  );
}
