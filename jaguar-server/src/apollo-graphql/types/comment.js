import User from "../../models/user";
import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";

const CommentType = `
    type Comment {
        _id: String
        comment: String
        user: User
        task: Task
        group: Group
        project: Project
        createdAt: Date
    }
`;

const CommentQuery = `
    allComment: [Comment]
    comment(_id: String): Comment
`;

const CommentMutation = `
    createTaskComment(
         _id: String
        comment: String
        user: String
        task: String
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
        return (await Task.find({ comments: _id }))
    },
    user: async ({ _id }) => {
        return (await User.find({ comments: _id }))
    },
    group: async ({ _id }) => {
        return (await Group.find({ comments: _id }))
    },
    project: async ({ _id }) => {
        return (await Project.find({ comments: _id }))
    },
};

const CommentMutationResolver = {
    createTaskComment: async (parent, args, { Comment, Task, User }) => {
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
