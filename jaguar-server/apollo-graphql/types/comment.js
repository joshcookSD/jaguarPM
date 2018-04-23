import User from "../../models/user";
import Time from "../../models/time";


const CommentType = `
    type Comment {
        _id: String
        time: Time
        date: String
        user: User
    }
`;

const CommentQuery = `
    allComment: [Comment]
    comment(_id: String): Comment
`;

const CommentMutation = `
    createComment(
         _id: String
        comment: Float
        date: String
        user: String
) : Comment
`;

const CommentQueryResolver = {
    allComment: async (parent, args, { Comment }) => {
        let comment = await Comment.find({});
        return comment.map(c => {
            c._id = c._id.toString();
            return c
        })
    },
    comment: async (parent, args, { Comment }) => {
        return await Comment.findById(args._id.toString())
    }
};

const CommentNested = {
    task: async ({ _id }) => {
        return (await Task.find({ time: _id }))
    },
    user: async ({ _id }) => {
        return (await User.find({ time: _id }))
    },
};

const CommentMutationResolver = {
    createComment: async (parent, args, { Comment, Task, User }) => {
        let comment = await new Comment(args).save();
        let user = await User.findById(args.user);
        user.comment.push(comment._id);
        await user.save();
        let task = await Task.findById(args.task);
        task.comment.push(comment._id);
        await task.save();
        return comment
    }
};

export { CommentType, CommentQuery, CommentMutation, CommentQueryResolver, CommentNested, CommentMutationResolver };
