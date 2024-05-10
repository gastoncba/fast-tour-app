import { Navigate, Outlet } from "react-router-dom";

interface Props {
  conditions?: Condition[];
}

interface Condition {
  redirectIf: (params?: any) => boolean;
  redirectTo: string;
  state?: any;
}

export const ProtectedRoute: React.FunctionComponent<Props> = (props: Props) => {
  if (props.conditions) {
    for (const condition of props.conditions) {
      if (condition.redirectIf()) {
        return <Navigate to={condition.redirectTo} state={condition.state} />;
      }
    }
  }
  return <Outlet />;
};
