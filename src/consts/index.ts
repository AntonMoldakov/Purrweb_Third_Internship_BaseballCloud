export const handData = [
  { value: 'l', label: 'L' },
  { value: 'r', label: 'R' },
];

export const positionData = [
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'shortstop', label: 'Shortstop' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

export const leaderboardPositionData = [
  { value: '', label: 'All' },
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'shortstop', label: 'Shortstop' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

export const dateData = [
  { value: '', label: 'All' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_month', label: 'Last Month' },
];

export const leaderboardTypeBattingData = [
  { value: 'exit_velocity', label: 'Exit Velocity' },
  { value: 'carry_distance', label: 'Carry Distance' },
];

export const NetworkUsersCountData = [
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '25', label: '25' },
];

export const leaderboardTypePitchingData = [
  { value: 'pitch_velocity', label: 'Pitch Velocity' },
  { value: 'spin_rate', label: 'Spin Rate' },
];

export const leaderboardFavoriteData = [
  { value: '', label: 'All' },
  { value: '1', label: 'Favorite' },
];

export const schoolYearData = [
  { value: 'freshman', label: 'Freshman' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: '', label: 'None' },
];

export const pitchTypeData = [
  { value: '', label: 'None' },
  { value: 'Four Seam Fastball', label: 'Four Seam Fastball' },
  { value: 'Two Seam Fastball', label: 'Two Seam Fastball' },
  { value: 'Curveball', label: 'Curveball' },
  { value: 'Changeup', label: 'Changeup' },
  { value: 'Slider', label: 'Slider' },
];

export const topBattingValues = [
  { value: 'distance', label: 'Distance' },
  { value: 'launch_angle', label: 'Launch Angle' },
  { value: 'exit_velocity', label: 'Exit Velocity' },
];
export const topPitchingValues = [
  { value: 'velocity', label: 'Pitch Velocity' },
  { value: 'spin_rate', label: 'Spin Rate' },
];

export const sessionTypeData = [
  { value: '', label: 'None' },
  { value: 'Game', label: 'Game' },
  { value: 'Practice', label: 'Practice' },
];

export const valuesColumnsButtingDataSummary = [
  {
    Header: 'Pitch Type',
    accessor: 'pitch_type',
  },
  {
    Header: 'Distance',
    accessor: 'distance',
  },
  {
    Header: 'Launch Angle',
    accessor: 'launch_angle',
  },
  {
    Header: 'Exit Velocity',
    accessor: 'exit_velocity',
  },
];

export const columnsButtingDataLog = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Pitcher Name',
    accessor: 'pitcher',
  },
  {
    Header: 'Pitcher Handedness',
    accessor: 'pitcher_handedness',
  },
  {
    Header: 'Pitch Type',
    accessor: 'pitch_type',
  },
  {
    Header: 'Pitch Call',
    accessor: 'pitch_call',
  },
];

export const subColumnsButtingDataLog = [
  {
    Header: 'Exit Velocity',
    accessor: 'exit_velocity',
  },
  {
    Header: 'Launch Angle',
    accessor: 'launch_angle',
  },
  {
    Header: 'Direction',
    accessor: 'direction',
  },
  {
    Header: 'Hit Spin Rate',
    accessor: 'hit_spin_rate',
  },
  {
    Header: ' Distance',
    accessor: 'distance',
  },
  {
    Header: 'Hang Time',
    accessor: 'hang_time',
  },
];

export const valuesColumnsPitchingDataSummary = [
  {
    Header: 'Pitch Type',
    accessor: 'pitch_type',
  },
  {
    Header: 'Velocity',
    accessor: 'velocity',
  },
  {
    Header: 'Spin Rate',
    accessor: 'spin_rate',
  },
];

export const columnsPitchingDataLog = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Batter Name',
    accessor: 'batter_name',
  },
  {
    Header: 'Pitch Type',
    accessor: 'pitch_type',
  },
  {
    Header: 'Pitch Call',
    accessor: 'pitch_call',
  },
  {
    Header: 'Velocity',
    accessor: 'velocity',
  },
  {
    Header: 'Spin Rate',
    accessor: 'spin_rate',
  },
  {
    Header: 'Spin Axis',
    accessor: 'spin_axis',
  },
];

export const subColumnsPitchingDataLog = [
  {
    Header: 'Vertical Break',
    accessor: 'vertical_break',
  },
  {
    Header: 'Horizontal Break',
    accessor: 'horizontal_break',
  },
  {
    Header: 'Height at Plate',
    accessor: 'height_at_plate',
  },
  {
    Header: 'Release Height',
    accessor: 'release_height',
  },
  {
    Header: ' Extension',
    accessor: 'extension',
  },
  {
    Header: 'Release Side',
    accessor: 'release_side',
  },
  {
    Header: 'Tilt',
    accessor: 'tilt',
  },
];

export const columnsBattingDataLeaderboard = [
  {
    Header: 'Rank',
    accessor: 'rank',
  },
  {
    Header: 'Batter Name',
    accessor: 'batter_name',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'School',
    accessor: 'school',
  },
  {
    Header: 'Teams',
    accessor: 'teams',
  },
  {
    Header: 'Exit Velocity',
    accessor: 'exit_velocity',
  },
  {
    Header: 'Launch Angle',
    accessor: 'launch_angle',
  },
  {
    Header: 'Distance',
    accessor: 'distance',
  },
  {
    Header: 'Favorite',
    accessor: 'favorite',
  },
];

export const columnsPitchingDataLeaderboard = [
  {
    Header: 'Rank',
    accessor: 'rank',
  },
  {
    Header: 'Pitcher Name',
    accessor: 'pitcher_name',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'School',
    accessor: 'school',
  },
  {
    Header: 'Teams',
    accessor: 'teams',
  },
  {
    Header: 'Pitch Type',
    accessor: 'pitch_type',
  },
  {
    Header: 'Velocity',
    accessor: 'velocity',
  },
  {
    Header: 'Spin Rate',
    accessor: 'spin_rate',
  },
  {
    Header: 'Favorite',
    accessor: 'favorite',
  },
];

export const columnsDataNetwork = [
  {
    Header: 'Player Name',
    accessor: 'player_name',
  },
  {
    Header: 'Sessions',
    accessor: 'sessions',
  },
  {
    Header: 'School',
    accessor: 'school',
  },
  {
    Header: 'Teams',
    accessor: 'teams',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Favorite',
    accessor: 'favorite',
  },
];

export const eventsColumnsData = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Type',
    accessor: 'event_type',
  },
  {
    Header: 'Name',
    accessor: 'event_name',
  },
  {
    Header: 'Purchased',
    accessor: 'id',
  },
];
