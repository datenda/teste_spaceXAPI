import { render, screen, waitFor } from '@testing-library/react';
import LaunchesTable from '@/app/components/launchList/LaunchesList';
import { client as ApolloClient } from '@/lib/apolloClient';

jest.mock('@/lib/apolloClient', () => ({
  client: {
    query: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

const mockLaunches = [
  {
    id: '1',
    mission_name: 'FalconSat',
    details: 'Test mission',
    launch_date_utc: '2006-03-24T22:30:00.000Z',
    links: { flickr_images: [] },
    rocket: {
      rocket_name: 'Falcon 1',
      rocket_type: 'Merlin',
      rocket: {
        id: 'falcon1',
        name: 'Falcon 1',
        type: 'Merlin',
      },
    },
  },
];

describe('LaunchesTable', () => {
  beforeEach(() => {
    ApolloClient.query.mockReset();
    ApolloClient.query.mockResolvedValue({ data: { launches: mockLaunches } });
  });

  it('renders launches after fetching', async () => {
    render(<LaunchesTable />);

    await waitFor(() => {
      expect(screen.getByText('FalconSat')).toBeInTheDocument();
    });

    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
    expect(screen.getByText('Test mission')).toBeInTheDocument();
    expect(screen.getByText('3/24/2006')).toBeInTheDocument();
  });
});
