import { IconBook, IconDesk, IconStretching } from "@tabler/icons-react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Circle,
  HelpCircle,
  Timer,
} from "lucide-react";

export const status_options = [
  {
    value: "backlog",
    label: "未完成",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "准备",
    icon: Circle,
  },
  {
    value: "doing",
    label: "进行中",
    icon: Timer,
  },
  {
    value: "done",
    label: "完成",
    icon: CheckCircle2,
  },
];

export const label_options = [
  {
    value: "exercise",
    label: "锻炼",
    icon: IconStretching,
  },
  {
    value: "life",
    label: "生活",
    icon: IconDesk,
  },
  {
    value: "study",
    label: "学习",
    icon: IconBook,
  },
];

export const priority_options = [
  {
    value: "low",
    label: "低",
    icon: ArrowDown,
  },
  {
    value: "medium",
    label: "适中",
    icon: ArrowRight,
  }
  ,
  {
    value: "high",
    label: "高",
    icon: ArrowUp,
  },
];
