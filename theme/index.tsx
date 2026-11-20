import {
  Layout as DefaultLayout,
  type LayoutProps,
} from '@rspress/core/theme-original';
import PackageGrid from '../docs/components/PackageGrid';

export * from '@rspress/core/theme-original';

export function Layout(props: LayoutProps) {
  return (
    <DefaultLayout
      {...props}
      afterHero={
        <>
          {props.afterHero}
          <PackageGrid />
        </>
      }
    />
  );
}
