import CommentCard from "../CommentCard";
import { Title, Container } from "./Comments.styles";
function Comments() {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* Activity 1 - Render CommentCard */}
      <CommentCard></CommentCard>
      {/* Activity 4 - Render CommentCard only if comments array is greater than zero */}
      {/* Activity 5 - Iterate comments */}
      {/* Activity 3 - Send comment prop */}
      <CommentCard />
    </Container>
  );
}

export default Comments;
