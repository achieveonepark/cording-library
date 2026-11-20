import packagesData from '../../packages.json';
import './PackageGrid.css';

type PackageEntry = {
  name: string;
  title: string;
  desc: string;
  openupm?: string;
};

const packages = packagesData as PackageEntry[];

export default function PackageGrid() {
  return (
    <main className="package-grid" aria-label="Unity 패키지 목록">
      {packages.map((pkg) => (
        <a className="package-card" key={pkg.name} href={`/${pkg.name}/`}>
          <h2>{pkg.title}</h2>
          <p>{pkg.desc}</p>
          {pkg.openupm && (
            <img
              className="package-card__badge"
              src={`https://img.shields.io/npm/v/${pkg.openupm}?label=openupm&registry_uri=https://package.openupm.com&color=3068b7&style=flat`}
              alt={`OpenUPM ${pkg.openupm}`}
              loading="lazy"
            />
          )}
          <span className="package-card__link">
            문서 보기 <span aria-hidden="true">→</span>
          </span>
        </a>
      ))}
    </main>
  );
}
