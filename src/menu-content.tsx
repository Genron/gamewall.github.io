import { CircularProgress } from '@rmwc/circular-progress';
// import { DocsMarkdown } from '@rmwc/doc-utils';
import React, {JSX} from 'react';

// import InstallationMD from '../markdown/README-INSTALLATION.md';
// import LibraryIntegrationsMD from '../markdown/README-LIBRARY-INTEGRATIONS.md';
// import MethodologyMD from '../markdown/README-METHODOLOGY.md';
// import StylingMD from '../markdown/README-STYLING-THEMING.md';
// import TypesMD from '../markdown/README-TYPES.md';
// import UsageMD from '../markdown/README-USAGE.md';

// import {
//   avatar,
//   badge,
//   base,
//   button,
//   card,
//   checkbox,
//   chip,
//   chipEvolution,
//   circularProgress,
//   dataTable,
//   dialog,
//   drawer,
//   elevation,
//   fab,
//   formfield,
//   grid,
//   gridList,
//   icon,
//   iconButton,
//   imageList,
//   linearProgress,
//   list,
//   listCollapsible,
//   listVariants,
//   menu,
//   provider,
//   radio,
//   ripple,
//   segmentedButton,
//   select,
//   slider,
//   snackbar,
//   switchControl,
//   tabs,
//   textfield,
//   theme,
//   tooltip,
//   rcTooltip,
//   topAppBar,
//   typography
// } from '@rmwc/readme';

// const InstallationDocs = () => <DocsMarkdown fileSrc={InstallationMD} />;
// const UsageDocs = () => <DocsMarkdown fileSrc={UsageMD} />;
// const StylingThemingDocs = () => <DocsMarkdown fileSrc={StylingMD} />;
// const MethodologyDocs = () => <DocsMarkdown fileSrc={MethodologyMD} />;
// const LibraryIntegrationsDocs = () => (
//   <DocsMarkdown fileSrc={LibraryIntegrationsMD} />
// );
// const TypeDocs = () => <DocsMarkdown fileSrc={TypesMD} />;

// const ResourcesDocs = React.lazy(() => import('../views/resources'));

const Loading = () => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      boxSizing: 'border-box'
    }}
  >
    <CircularProgress size="large" />
  </div>
);

const Loadable = (Component: any) => () => (
  <React.Suspense fallback={<Loading />}>
    <Component />
  </React.Suspense>
);

function AnyComponent() {
  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
}

function MyGallery() {
  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
}

export type MenuItemT = {
  label: string;
  url?: string;
  gallery?: React.ReactNode;
  component?: () => JSX.Element;
  options?: MenuItemT[];
};

export const menuContent: MenuItemT[] = [
  {
    label: 'Getting Started',
    options: [
      {
        label: 'Installation',
        url: `/installation`,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Basic Usage',
        url: `/usage`,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Project Methodology',
        url: `/methodology`,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Type System',
        url: `/type-system`,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Library Integrations',
        url: `/library-integrations`,
        component: Loadable(AnyComponent)
      }
    ]
  },
  {
    label: 'Style and Theming',
    url: `/styling-theming`,
    component: Loadable(AnyComponent)
  },
  {
    label: 'Resources',
    url: `/resources`,
    component: Loadable(AnyComponent)
  },
  {
    label: 'Components',
    options: [
      {
        label: 'Avatars',
        url: `/avatars`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Badges',
        url: `/badges`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Buttons',
        options: [
          {
            label: 'Buttons',
            url: `/buttons`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Fabs',
            url: `/fabs`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Icon Buttons',
            url: `/icon-buttons`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Segmented Button',
            url: `/segmented-button`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          }
        ]
      },
      {
        label: 'Cards',
        url: `/cards`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Chips',
        options: [
          {
            label: 'Chips',
            url: `/chips`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Evolution Chips (experimental)',
            url: `/evolution-chips`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          }
        ]
      },
      {
        label: 'Data Tables',
        url: `/data-tables`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Dialogs',
        url: `/dialogs`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Drawers',
        url: `/drawers`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Elevation',
        url: `/elevation`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Grids',
        options: [
          {
            label: 'Layout Grid',
            url: `/layout-grid`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Image Lists',
            url: `/image-lists`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Grid Lists',
            url: `/grid-lists`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          }
        ]
      },

      {
        label: 'Inputs and Controls',
        options: [
          {
            label: 'Checkboxes',
            url: `/checkboxes`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'FormFields',
            url: `/formfields`,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Radio Buttons',
            url: `/radio-buttons`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Select Menus',
            url: `/select-menus`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Sliders',
            url: `/sliders`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Switches',
            url: `/switches`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Text Fields',
            url: `/text-fields`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          }
        ]
      },

      {
        label: 'Progress',
        options: [
          {
            label: 'Linear Progress',
            url: `/linear-progress`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Circular Progress',
            url: `/circular-progress`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          }
        ]
      },
      {
        label: 'Lists',
        options: [
          {
            label: 'Lists',
            url: `/lists`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Collapsible',
            url: `/lists-collapsible`,
            component: Loadable(AnyComponent)
          },
          {
            label: 'Variants',
            url: `/lists-variants`,
            component: Loadable(AnyComponent)
          }
        ]
      },
      {
        label: 'Menus',
        url: `/menus`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Ripples',
        url: `/ripples`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },

      {
        label: 'Snackbars',
        url: `/snackbars`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Tabs',
        url: `/tabs`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Theme',
        url: `/theme`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Tooltips',
        options: [
          {
            label: 'Tooltips',
            url: `/tooltips`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          },
          {
            label: 'RC Tooltips',
            url: `/rc-tooltips`,
            gallery: <MyGallery />,
            component: Loadable(AnyComponent)
          }
        ]
      },
      {
        label: 'Top App Bar',
        url: `/top-app-bar`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Typography',
        url: `/typography`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Icons',
        url: `/icons`,
        gallery: <MyGallery />,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Provider',
        url: `/provider`,
        component: Loadable(AnyComponent)
      },
      {
        label: 'Portal',
        url: `/portal`,
        component: Loadable(AnyComponent)
      }
    ]
  }
];

export const galleryContent = menuContent
  .reduce<MenuItemT[]>((acc, item) => {
    if ('options' in item) {
      acc.push(...(item.options || []));
    } else {
      acc.push(item as MenuItemT);
    }

    return acc;
  }, [])
  .filter((item) => !!item.gallery);
