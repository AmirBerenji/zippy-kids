import NurseProfileClient from "../../component/nurseprofileclient";


type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ userid?: string }>;
};

export default async function NurseProfilePage(props: Props) {

  const { id } = await props.params;
  const { userid } = await props.searchParams;

  return <NurseProfileClient id={id} userid={userid} />;
}