import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyDialogMessage({
  text,
  isOpen,
  returnMessage,
  onlyOk = true,
  title,
}) {
  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          returnMessage(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {text && (
            <DialogContentText id="alert-dialog-slide-description">
              {text[0] && text[0]}
              <br></br>
              {text[1] && text[1]}
              <br></br>
              {text[2] && text[2]}
              <br></br>
              {text[3] && text[3]}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {!onlyOk && (
            <Button
              onClick={() => {
                returnMessage(false);
              }}
            >
              Annulla
            </Button>
          )}
          <Button
            onClick={() => {
              returnMessage(true);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { MyDialogMessage };
