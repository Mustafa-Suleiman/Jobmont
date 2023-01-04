import ContentLoader from 'react-content-loader';

const StatsLoader = props => {
  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <ContentLoader
        width={800}
        height={500}
        viewBox='0 0 250 250'
        backgroundColor='#e8e8e8'
        foregroundColor='#c9c9c9'
        {...props}
      >
        <rect x='0' y='160' rx='0' ry='0' width='25' height='40' />
        <rect x='30' y='145' rx='0' ry='0' width='25' height='55' />
        <rect x='60' y='126' rx='0' ry='0' width='25' height='74' />
        <rect x='90' y='80' rx='0' ry='0' width='25' height='120' />
        <rect x='120' y='142' rx='0' ry='0' width='25' height='58' />
      </ContentLoader>
    </div>
  );
};

export default StatsLoader;
