import ContentLoader from 'react-content-loader';

function JobsLoader(props) {
  return (
    <div className='jobs'>
      {Array(props.repeat)
        .fill(0)
        .map((_, index) => (
          <ContentLoader
            speed={2}
            width={450}
            height={250}
            viewBox='0 0 400 180'
            backgroundColor='#e8e8e8'
            foregroundColor='#c9c9c9'
            {...props}
            key={index}
          >
            <rect x='3' y='0' rx='3' ry='3' width='63' height='57' />
            <rect x='113' y='6' rx='3' ry='3' width='153' height='20' />
            <rect x='43' y='122' rx='3' ry='3' width='93' height='9' />
            <circle cx='19' cy='91' r='10' />
            <circle cx='19' cy='127' r='10' />
            <rect x='17' y='159' rx='3' ry='3' width='45' height='21' />
            <rect x='70' y='158' rx='3' ry='3' width='54' height='21' />
            <rect x='43' y='87' rx='3' ry='3' width='93' height='9' />
            <rect x='207' y='84' rx='3' ry='3' width='93' height='9' />
            <circle cx='187' cy='90' r='10' />
            <rect x='198' y='124' rx='3' ry='3' width='80' height='19' />
            <rect x='116' y='40' rx='3' ry='3' width='104' height='7' />
          </ContentLoader>
        ))}
    </div>
  );
}
export default JobsLoader;
