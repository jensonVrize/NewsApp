import Toast from 'react-native-toast-message';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

export function showToast(message, title = 'Alert', type = 'info') {
  //type = success, error, info
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    position: 'bottom',
  });
}

export const DUMMY_LOAD_DATA = [
  {
    source: {
      id: null,
      name: 'The Guardian',
    },
    author: 'Ruth Michaelson',
    title:
      'Turkish forces kill Islamic State chief in Syria raid, says Erdoğan - The Guardian',
    description:
      'Turkish president says Abu Hussein al-Qurashi killed after pursuit while northern Syria residents report clashes and large explosion',
    url: 'https://www.theguardian.com/world/2023/may/01/turkish-forces-kill-islamic-state-chief-in-syria-raid-says-erdogan',
    urlToImage:
      'https://i.guim.co.uk/img/media/40def3672b024c4aa72bfbf8f27808a4c12a8d1a/0_358_5289_3172/master/5289.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=b34fdc37625c3b500060bbc09c03cd57',
    publishedAt: '2023-05-01T09:55:00Z',
    content:
      'Turkish intelligence forces have killed Islamic States leader, Abu Hussein al-Qurashi, in Syria, Turkeys president announced.\r\nThis individual was neutralised as part of an operation by the Turkish n… [+2422 chars]',
  },
  {
    source: {
      id: 'cnn',
      name: 'CNN',
    },
    author: 'Ben Morse',
    title:
      "'Legendary': Steph Curry scores record 50 points in Golden State Warriors' playoff win over Sacramento Kings - CNN",
    description:
      "There have been plenty of games in which Steph Curry's basketball greatness has been evident. Sunday was another one.",
    url: 'https://www.cnn.com/2023/05/01/sport/steph-curry-game-7-warriors-kings-spt-intl/index.html',
    urlToImage:
      'https://media.cnn.com/api/v1/images/stellar/prod/230501084147-02-steph-curry-warriors-kings-043023.jpg?c=16x9&q=w_800,c_fill',
    publishedAt: '2023-05-01T09:15:00Z',
    content:
      'There have been plenty of games in which Steph Currys basketball greatness has been evident. Sunday was another one. \r\nCurry scored a playoff career-high 50 points in Golden States 120-100 Game 7 vic… [+2465 chars]',
  },
];

export const NewsLoader = props => (
  <ContentLoader
    speed={0.5}
    width={400}
    height={340}
    viewBox="0 0 400 340"
    backgroundColor={'#584758'}
    foregroundColor={'#999'}>
    <Rect x="8" y="0" rx="16" ry="16" width="98%" height="250" />
    <Rect x="14" y="260" rx="2" ry="2" width="80" height="10" />
    <Rect x="14" y="280" rx="2" ry="2" width="90%" height="12" />
    <Rect x="14" y="300" rx="2" ry="2" width="60%" height="12" />
    <Rect x="14" y="322" rx="2" ry="2" width="60" height="8" />
    <Circle cx="90" cy="325" r="5" />
    <Rect x="105" y="322" rx="2" ry="2" width="60" height="8" />
  </ContentLoader>
);
