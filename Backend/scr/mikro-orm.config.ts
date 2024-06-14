import { Options } from '@mikro-orm/core';
import { Reise,Reiseziel} from './entities';


const options: Options = {
  type: 'postgresql',
  entities: [Reise, Reiseziel],
  dbName: 'diaryDB',
  password: 'fweSS22',
  user: 'diaryDBUser',
  debug: true,
};

export default options;
