"use client";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import ReminderCard from "../reminderCard";
import { IReminders } from "src/types/clientTypes";
import { useQuery } from "@tanstack/react-query";
import { getReminders } from "src/queryFn";
import Loading from "src/app/(pages)/reminders/loading";

export default function RemindersList() {
  const {
    data: reminders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reminders"],
    queryFn: getReminders,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>error</div>;

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      padding={4}
    >
      {reminders &&
        reminders.length > 0 &&
        reminders.map((v: IReminders) => (
          <ReminderCard reminder={v} key={v.id} />
        ))}
      {(!reminders || (reminders && reminders.length === 0)) &&
        (!isLoading || !error) && <div>AGREGAR REMINDER</div>}
    </SimpleGrid>
  );
}
