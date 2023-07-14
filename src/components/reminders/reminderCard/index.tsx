"use client";
import NextLink from "next/link";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { IReminders } from "src/types/clientTypes";

export default function ReminderCard({ reminder }: { reminder: IReminders }) {
  return (
    <Card
      as={NextLink}
      href={`/reminders/${reminder.id}`}
      _hover={{ boxShadow: "var(--chakra-shadows-lg)" }}
      transition={"ease-in-out 200ms"}
    >
      <CardHeader>
        <Heading size="md">{reminder.reminder_info.title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {reminder.created_at}
            </Heading>
            <Text pt="2" fontSize="sm">
              {reminder.reminder_info.info || ""}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
