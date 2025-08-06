import { ActivatedRoute, Params, Router } from '@angular/router';

export function mergeRouter(
  router: Router,
  route: ActivatedRoute,
  params: Params
) {
  params['_t'] = new Date().getTime();
  router.navigate([], {
    relativeTo: route,
    queryParams: params,
    queryParamsHandling: 'merge',
  });
}
