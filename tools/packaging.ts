// import libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import * as fs from 'fs-extra';

/**
 * Class declaration
 */
class Packaging {
    // private property to store src path
    private _srcPath: string;
    // private property to store dest path
    private _destPath: string;

    /**
     * Class constructor
     *
     * @param src {string} src base path from current process
     * @param dest {string} dest base path from current process
     */
    constructor(src = '', dest = '/dist') {
        this._srcPath = `${process.cwd()}${src}/`;
        this._destPath = `${process.cwd()}${dest}/`;
    }

    /**
     * Function to copy one file
     *
     * @param file {string}
     *
     * @return {Observable<R>}
     */
    private _copy(file: string): Observable<any> {
        // copy package.json
        if (file.indexOf('package.json') !== -1) {
            return this._copyAndCleanupPackageJson(file);
        }
        return <Observable<any>> Observable.create((observer) => {
            let fileDest = file;
            fs.copy(`${this._srcPath}${file}`, `${this._destPath}${fileDest}`, (error) => {
                if (error) {
                    return observer.error(error);
                }
                observer.next();
                observer.complete();
            });
        });
    }

    /**
     * Function to cleanup package.json and _copy it to dist directory
     *
     * @param file {string}
     *
     * @return {Observable<R>}
     *
     * @private
     */
    private _copyAndCleanupPackageJson(file: string): Observable<any> {
        // function to read JSON
        const readJson = (src: string): Observable<any> => {
            return <Observable<any>> Observable.create((observer) => {
                fs.readJson(src, (error, packageObj) => {
                    if (error) {
                        return observer.error(error);
                    }

                    observer.next(packageObj);
                    observer.complete();
                });
            });
        };

        // function to write JSON
        const writeJson = (dest: string, data: any): Observable<any> => {
            return <Observable<any>> Observable.create((observer) => {
                fs.outputJson(dest, data, (error) => {
                    if (error) {
                        return observer.error(error);
                    }

                    observer.next();
                    observer.complete();
                });
            });
        };

        // read package.json
        return readJson(`${this._srcPath}${file}`).flatMap(packageObj => {
            // delete obsolete data in package.json
            const postinstall = packageObj.scripts.postinstall;
            delete packageObj.scripts;
            delete packageObj.devDependencies;
            Object.assign(packageObj, { scripts: { postinstall }});

            // write new package.json
            return writeJson(`${this._destPath}${file}`, packageObj);
        });
    }

    /**
     * Function that _copy all files in dist directory
     */
    process() {
        this._copy('package.json').subscribe(_ => console.log('package.json copied'));
        this._copy('README.md').subscribe(_ => console.log('README.md copied'));
    }
}

// process packaging
new Packaging().process();
