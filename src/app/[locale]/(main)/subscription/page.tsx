import React from "react";
import SubscriptionHeader from "./components/header";
import IncludedInAll from "./components/includedInAll";
import SubscriptionClient from "./components/subscriptionClient";

export default function SubscriptionPage() {
  return (
    <>
      <SubscriptionHeader />
      <SubscriptionClient />
      <IncludedInAll />
    </>
  );
}
