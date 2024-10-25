import { render, screen, waitFor, act } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";
import { MemoryRouter, Route, Routes} from "react-router-dom";
import routes from "../routes";
import Homepage from "../pages/Homepage";

describe('Breadcrumbs component', ()=> {
    const setup = (initialRoute, paths) => {
        return render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <Routes>
                    <Route path="*" element={<Breadcrumbs paths={paths} />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('should render with the valid paths', () => {
        const {getByText} = setup('/', routes);
        routes.forEach(route => {
            expect(getByText(route.label)).toBeInTheDocument();
        });
    });

    it('does not render if paths prop is empty',()=>{
        const { container } = setup('/',[]);
        expect(container.firstChild).toBeNull();
    });

    it('does not render if paths prop is formatted incorrectly', () => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const incorrectPaths = [
            { path: '/', label: 'Homepage' },
            { exact: true, component: <div/>, label: 'No Path'}
        ];
        const { container } = setup(incorrectPaths);
        expect(container.firstChild).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid paths prop');
        consoleErrorSpy.mockRestore();
    });

    it('applies the active styling to the selected tab and default style to remaining', () => {
        const {getByText} = setup('/dashboard', routes);
        routes.forEach(route => {
            const link = getByText(route.label);
            if(route.path === '/dashboard'){
                expect(link).toHaveClass('text-slate-800');
            }else{
                expect(link).toHaveClass('text-slate-500');
            }
        });
    });

    it('displays arrow icon between path except for the first path', () =>{
        const {container} = setup('/', routes);
        const arrowIcons = container.querySelectorAll('svg');
        expect(arrowIcons).toHaveLength(routes.length - 1);
        arrowIcons.forEach(icon => {
            expect(icon).toHaveClass('text-gray-400');
        });
    })

    it('does not render if duplicate components are in paths', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const duplicatePaths = [
            { path: "/", exact: true, component: <Homepage />, label: "Homepage" },
    { path: "/", exact: true, component: <Homepage />, label: "Homepage Again" },
        ];
        const { container } = setup("/", duplicatePaths);
        expect(container.firstChild).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid paths prop");
        consoleErrorSpy.mockRestore();
    })

})