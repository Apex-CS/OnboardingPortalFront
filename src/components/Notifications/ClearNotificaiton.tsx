import { Button } from "@mui/material";
import { useNotification } from "../../hooks/useNotification";

export default function ClearNotification() {
  const { displayNotification, clearNotification } = useNotification();
  return (
    <>
      <Button
        color="success"
        variant="contained"
        onClick={() =>
          displayNotification({
            message: "Success! You added me from another component",
            type: "success"
          })
        }
      >
        Success Notification
      </Button>
      {/* <ChildOfAnotherComponent /> */}
      <Button color="secondary" onClick={clearNotification}>
        Clear notification
      </Button>
    </>
  );
}
