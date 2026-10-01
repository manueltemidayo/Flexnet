import { Card, CardContent, Skeleton, Box } from '@mui/material'

export default function MovieCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={0}
        sx={{ paddingTop: '150%', bgcolor: '#252B3B' }}
      />
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <Skeleton variant="text" width={30} height={16} />
          <Skeleton variant="text" width={8} height={16} />
          <Skeleton variant="text" width={50} height={16} />
          <Skeleton variant="text" width={8} height={16} />
          <Skeleton variant="text" width={20} height={16} />
        </Box>
        <Skeleton variant="text" width="80%" height={20} />
      </CardContent>
    </Card>
  )
}
