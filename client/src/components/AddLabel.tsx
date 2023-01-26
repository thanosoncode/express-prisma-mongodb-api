import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddLabelProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAdd: () => void;
  onGoBack: () => void;
}

const AddLabel: React.FC<AddLabelProps> = (props) => {
  return (
    <>
      <TextField
        id="label"
        label="Label"
        variant="outlined"
        value={props.label}
        onChange={props.onChange}
      />
      <Button variant="outlined" disabled={!props.label} onClick={props.onAdd}>
        add
      </Button>
      <Button variant="text" onClick={props.onGoBack}>
        go back
      </Button>
    </>
  );
};
export default AddLabel;
