import { Link, routes } from '@redwoodjs/router';
import type { FindProfileById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import GoalsEditor from "src/components/GoalsEditor/GoalsEditor";
import Navbar from "src/components/Navbar/Navbar";
import GoalsForm from "src/components/GoalsEditor/GoalsForm";
import GoalsFormBtns from 'src/components/GoalsEditor/GoalsFormBtns';
import { CL, za } from "src/utilities/logger";

export const QUERY = gql`
  query GetUserGoals {
    getUserGoals: getUserGoals {
      id
    }
  }
`

export const Loading = () => <div>Retrieving history, if any...</div>

export const Empty = () => {
  return (
    <div className="pageContentWrapper">
      <Navbar />

      <GoalsEditor>
        <>
          <div className="goalFormParent w-4/6 bg-independence-10">
            <h1 className="my-8 mx-16">Goals Editor</h1>
            <GoalsForm />
          </div>
          <div className="goalFormSidebar w-2/6 bg-greenSheen-10">
            {/* add btns */}
            <GoalsFormBtns />
            {/* add guide */}
            <div className="">
              <p>Think about the next 3-4 weeks.</p>
              <p>What are some goals you will be working towards.</p>
              <div>
                <p className="italic">What is a goal?</p>
                <p>A goal is a result towards which effort is directed.</p>
              </div>
            </div>
          </div>
        </>
      </GoalsEditor>

    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => {
  CL(za, 'error in GoalsEditorCell', error);
  return (
    <div className="rw-cell-error">{error?.message}</div>
  )
};

export const Success = ({ }: CellSuccessProps) => {
  return (
    <div className="pageContentWrapper">
      <Navbar />

      <GoalsEditor>
        <>
          <div className="goalFormParent w-4/6 bg-independence-10">
            <h1 className="my-8 mx-16">Goals Editor</h1>
            <GoalsForm />
          </div>
          <div className="goalFormSidebar w-2/6 bg-greenSheen-10">
            {/* add btns */}
            <GoalsFormBtns />
            {/* add guide */}
            <div className="">
              <p>Think about the next 3-4 weeks.</p>
              <p>What are some goals you will be working towards.</p>
              <div>
                <p className="italic">What is a goal?</p>
                <p>A goal is a result towards which effort is directed.</p>
              </div>
            </div>
          </div>
        </>
      </GoalsEditor>

    </div>
  );
};


