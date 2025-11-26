import { Box, CircularProgress, Typography } from '@mui/material';

export const PermissionsLoading = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight={200}
    gap={2}
    sx={{ py: 4 }}
  >
    <CircularProgress />
    <Typography variant="body1" color="text.secondary">
      Loading permissions...
    </Typography>
  </Box>
);
