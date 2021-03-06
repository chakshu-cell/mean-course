import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../../post.model';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  /* posts = [
    {title: 'first Post', content: 'this is first'},
    {title: 'second Post', content: 'this is second'},
    {title: 'third Post', content: 'this is third'}
  ]; */
  constructor(public postsService: PostsService) {}

  posts: Post[] = [];

  private postsSub: Subscription;

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdatedListner()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe(); }

}
