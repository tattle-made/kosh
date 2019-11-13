import { FactCheckedStory } from '../routes/fact-checked-stories/FactCheckedStoryDb';

export const doDbTask = () => {
    FactCheckedStory.sync({force: true})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
