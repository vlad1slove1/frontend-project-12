import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';

const actions = {
  adding: AddChannel,
  renaming: RenameChannel,
  deleting: DeleteChannel,
};

export default (action) => actions[action];
