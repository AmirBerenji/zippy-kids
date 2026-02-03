import { getChildrenByUser } from "@/action/parentApiAction";
import Childcard from "@/app/[locale]/(main)/services/parent/component/childcard";
import { Child } from "@/model/child";
import React, { useEffect, useState } from "react";

export default function ChildList() {
  const [childs, setChilds] = useState<Child[]>([]);
  useEffect(() => {
    async function fetchChildren() {
      const data = await getChildrenByUser();
      setChilds(data);
    }
    fetchChildren();
  }, []);

  return (
    <>
      <div className=" grid grid-cols-3">
        {childs.map((child) => (
          <Childcard key={child.id} id={child.id} child={child} />
        ))}
      </div>
    </>
  );
}
