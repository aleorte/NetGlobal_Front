import { ListItem } from "../../../styles/material";
import { styled} from "@mui/system";

export const ListItemStyled = styled(ListItem)({
    "&.Mui-selected": {
        backgroundColor: 'white',
        color:"#8757DF"
        /* borderRadius:"10px" */
    },
    borderRadius:"10px",
    width:'90%',
    margin: "0 auto 5px auto",
    
})

