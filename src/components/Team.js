import React from 'react';
import './Team.css'; 
import Sudhir from '../image/Sudhir.jpeg'; 
import Kamal from '../image/Kamal.jpeg'; 
import Anju from '../image/Anju.jpeg';
import Sandhya from '../image/Sandhya.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faLink } from '@fortawesome/free-solid-svg-icons';

const Card = ({ team }) => {
  return (
    <div className="teamcard">
      <div className="teamposter">
        <img src={team.poster} alt={team.title} />
      </div>
      <div className="teamdetails">
        <h1>{team.title}</h1>
        <h2>{team.position}</h2>
        <div className="teamrating">
          {Array.from({ length: 5 }, (_, index) => (
            <i
              key={index}
              className={`fas fa-star${index < Math.floor(team.rating) ? '' : '-half-alt'}`}
              style={{ color: index < Math.floor(team.rating) ? '#e3c414' : '' }}
            />
          ))}
          <span>{team.rating}/5</span>
        </div>
        <div className="teamtags">
          {team.tags.map((tag, index) => (
            <span key={index} className="teamtag">{tag.text}</span>
          ))}
        </div>
        <p className="teamdesc">{team.desc}</p>
        <div className="teamsocial-links">
          <h3>Social Links</h3>
          <ul>{team.socialLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.icon === 'fa-linkedin' && <FontAwesomeIcon icon={faLinkedin} className="icon" />}
                {link.icon === 'fa-github' && <FontAwesomeIcon icon={faGithub} className="icon" />}
                {link.icon === 'fa-link' && <FontAwesomeIcon icon={faLink} className="icon" />}
              </a>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const team = [
    {
      poster: Sudhir, 
      title: 'Sudhir',
      position: 'Leader',
      rating: 4.8,
      tags: [
        { text: 'Frontend' },
        { text: 'Backend' }
      ],
      desc: 'A dedicated developer and leader with a passion for full-stack web development. Always eager to tackle new challenges and drive innovative solutions.',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/sudhir-606a32274', icon: 'fa-linkedin' },
        { url: 'https://github.com/heyadhira', icon: 'fa-github' },
        { url: 'https://sudhirportfolio.s3.eu-gb.cloud-object-storage.appdomain.cloud/SudhirPortfolio/index.html', icon: 'fa-link' } 
      ]
    },
    {
      poster: Anju,
      title: 'Anju Luthra',
      position: 'Member',
      rating: 4.5,
      tags: [
        { text: 'Frontend' },
        { text: 'Backend' }
      ],
      desc: 'A motivated team player with a solid foundation in management and leadership. Enthusiastic about learning new technologies and improving team workflows.',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/anju-luthra-538955245/', icon: 'fa-linkedin' },
        { url: 'https://github.com/Anjuluthra13', icon: 'fa-github' },
        { url: 'https://anjuluthra13.github.io/em-1-project', icon: 'fa-link' } 
      ]
    },
    {
      poster: Sandhya,
      title: 'Sandhya Prajapati',
      position: 'Member',
      rating: 4,
      tags: [
        { text: 'Frontend' },
        { text: 'Backend' }
      ],
      desc: 'A passionate team member with a strong understanding of teamwork and excited about learning new things.',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/sandhya-prajapati-530664237', icon: 'fa-linkedin' },
        { url: 'https://github.com/prajapatisan', icon: 'fa-github' },
        { url: 'https://prajapatisan.github.io/creative-cv/', icon: 'fa-link' } 
      ]
    },
    {
      poster: Kamal, 
      title: 'Kamal',
      position: 'Member',
      rating: 4,
      tags: [
        { text: 'Frontend' },
        { text: 'Backend' }
      ],
      desc: 'An aspiring designer with a flair for creativity and a keen eye for detail.',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/kamal-sharma-828a5018b/', icon: 'fa-linkedin' },
        { url: 'https://github.com/kamal8996', icon: 'fa-github' },
        { url: 'https://github.com/kamal8996/portfolio', icon: 'fa-link' } 
      ]
    }
  ];
  return (
    <div className="teampage">
      <h1>Meet Our Team - Work4You</h1>
      <p>We are a dedicated group of professionals committed to delivering the best solutions for your business.</p>
      <div className="teamwrapper">
        {team.map((member, index) => (
          <Card key={index} team={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
