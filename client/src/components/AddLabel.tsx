import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AddLabelProps {
  label: string;
  labelAdded: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
  onAdd: () => void;
  onGoBack: () => void;
}

const AddLabel: React.FC<AddLabelProps> = (props) => {
  const labels = [
    "push",
    "pull",
    "upper body",
    "lower body",
    "legs",
    "legs anterior focus",
    "legs posterior focus",
    "shoulders",
    "calisthenics",
    "other",
  ];

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {props.labelAdded ? null : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h6">Add label to your workout</Typography>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="label">Label</InputLabel>
              <Select
                id="label"
                label="Age"
                labelId="label"
                value={props.label}
                onChange={props.onChange}
              >
                {labels.map((label) => (
                  <MenuItem key={label} value={label}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={props.onAdd}>
              add
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default AddLabel;
