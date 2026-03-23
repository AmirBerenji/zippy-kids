import DoctorProfileClient from "../../component/doctorprofileclient";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ userid?: string }>;
};

export default async function DoctorProfilepage(props: Props) {
  const { id } = await props.params;
  const { userid } = await props.searchParams;
  return <DoctorProfileClient id={id} userid={userid} />;
}
