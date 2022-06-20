import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const LoginOptions = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item md={12} xl={5}>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    );
};

export default LoginOptions