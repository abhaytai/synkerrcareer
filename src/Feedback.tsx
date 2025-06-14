import React, { useRef, useState } from 'react';
import { AirplaneIcon } from './AirplaneIcon';
import { Button } from './Button';
import { User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { DragDiv } from './DragDiv';
import { db, storage } from './firebase';
import './Feedback.css';

// Given a # of bytes, format that into a nice human readable string
export const bytesToHumanReadable = (bytes: number) => {
  if (bytes == 0) {
    return '0B';
  }
  const e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, e)).toFixed(2) + '' + ' KMGTP'.charAt(e) + 'B';
};

export const Feedback = ({ user }: { user: User }) => {
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [WhatsApp, setWhatsApp] = useState('');
  const [dob, setdob] = useState('');
  const [college, setcollege] = useState('');
  const [year, setyear] = useState('');
  const [experience, setexperience] = useState('');
  const [reason, setreason] = useState('');
  const [projectLink, setprojectLink] = useState('');
  const [Role, setRole] = useState('');
  const [linkedin, setlinkedin] = useState('');
  const [files, setFiles] = useState<Array<{ file: File; url: string }>>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fileUpload = useRef<HTMLInputElement | null>(null);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const files: File[] = [];
    for (const file of fileList) {
      files.push(file);
    }

    setFiles((current) => [
      ...current,
      ...files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
  };

  const submitForm = async () => {
    const id = uuidv4();
    const feedbackRef = doc(db, `user_data/${user.uid}/feedback/${id}`);

    if (files.length > 50) {
      setError('You can only upload a maximum of 50 items');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const file = files.find(({ file }) => file.size > 20 * 1024 * 1024);
      if (file) {
        setError(`"${file.file.name}" is larger than 20 MB`);
        return;
      }

      for (const { file } of files) {
        const storageRef = ref(
          storage,
          `${user.uid}/feedback/${id}/${uuidv4()}_${file.name}`,
        );
        await uploadBytes(storageRef, file);
      }

      await setDoc(feedbackRef, {
        feedback,
        WhatsApp,
        Role,
        college,
        year,
        dob,
        reason,
        projectLink,
        linkedin,
        experience,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      setError('An unknown error occurred while submitting feedback.');
      throw e;
    } finally {
      setLoading(false);
    }

    setFiles([]);
    setFeedback('');
    setWhatsApp('');
    setRole('');
    setdob('');
    setyear('');
    setcollege('');
    setexperience('');
    setprojectLink('');
    setreason('');
    setlinkedin('');
    setSuccess(true);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setreason(value);

    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount < 30) {
      setError('Please provide at least 30 words.');
    } else {
      setError('');
    }
  };

  return (
    <div className="top-margin">
      <div className="space-y-3 pt-8 ">
        {success ? (
          <>
            <div className="flex justify-center mt-100">
              <AirplaneIcon className="w-48" />
            </div>
            <div className="text-sm p-3 border-2 rounded-lg border-green-400 bg-green-200 text-green-700 mt-100">
              <h1 className="font-bold">
                Your Application Has Been Successfully Submitted!
              </h1>
              <p>
                We'll shortly review your application, and you'll receive
                updates on registered email and contact number. We look forward
                to onboarding dedicated applicants!
              </p>
            </div>
            <p className="text-center">
              Know More{' '}
              <button
                className="cursor-pointer hover:underline focus:underline focus:outline-none text-blue-500"
                onClick={() => (window.location.href = 'https://synkerr.com')}
              >
                About Synkerr!
              </button>
            </p>
          </>
        ) : (
          <>
            <div>
              <h1 className="font-bold text-xl">
                <b>APPLY NOW</b>
              </h1>
              <p className="text-white-700 text-sm sm:text-xs">
                Do you know at Synkerr we prefer dedicated applicats over
                talented and deep enthusiasm to work in startups. If you are
                interested to work in early stage startup, please file out the
                registration form below.
              </p>
            </div>

            <form className="mt-10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    Name<span className="text-red-500">*</span>
                  </span>
                  <input
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                </label>
                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    WhatsApp No.<span className="text-red-500">*</span>
                  </span>
                  <input
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={WhatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                    required
                  />
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    Role<span className="text-red-500">*</span>
                  </span>
                  <select
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="video editor">Video Editor</option>
                    <option value="web dev">Web Dev</option>
                  </select>
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    Date of Birth<span className="text-red-500">*</span>
                  </span>
                  <input
                    type="date"
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={dob}
                    onChange={(e) => setdob(e.target.value)}
                    required
                  />
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    College Name<span className="text-red-500">*</span>
                  </span>
                  <input
                    className="border-gray-white border rounded w-full py-1 px-2"
                    value={college}
                    onChange={(e) => setcollege(e.target.value)}
                    required
                  />
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    Which year UG student{' '}
                    <span className="text-red-500">*</span>
                  </span>
                  <select
                    className="border-gray-300 border rounded w-full py-1 px-2"
                    value={year}
                    onChange={(e) => setyear(e.target.value)}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                  </select>
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    Brief your experience
                  </span>
                  <textarea
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={experience}
                    onChange={(e) => setexperience(e.target.value)}
                    rows={1}
                    required
                  />
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    Why you want to join Synkerr (min 30 words)
                    <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={reason}
                    onChange={handleReasonChange}
                    rows={1}
                    required
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    Major Project Link
                  </span>
                  <input
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={projectLink}
                    onChange={(e) => setprojectLink(e.target.value)}
                    required
                  />
                </label>

                <label className="text-gray-700">
                  <span className="text-white font-bold inline-block mt-6">
                    LinkedIn Profile
                  </span>
                  <input
                    className="border-white-300 border rounded w-full py-1 px-2"
                    value={linkedin}
                    onChange={(e) => setlinkedin(e.target.value)}
                    required
                  />
                </label>
              </div>

              <input
                id="attachments-upload"
                type="file"
                multiple
                className="hidden"
                ref={fileUpload}
                onChange={(e) => addFiles(e.target.files)}
              />
              <label htmlFor="attachments-upload" className="text-gray-700">
                <span className="text-white font-bold leading-none mt-10 block">
                  Attach Resume<span className="text-red-500">*</span>
                </span>
                <DragDiv
                  className="rounded border border-dashed border-gray-400 flex items-center justify-center flex-col py-3 space-y-2 mt-2 h-40"
                  addFiles={addFiles}
                  dragOverClassName="bg-gray-200"
                >
                  <div className="text-sm">
                    <button
                      title="Upload resume"
                      className="cursor-pointer hover:underline focus:underline focus:outline-none text-blue-500"
                      onClick={(e) => {
                        e.preventDefault();
                        fileUpload.current && fileUpload.current.click();
                      }}
                    >
                      Click here
                    </button>{' '}
                    <span className="text-white">or drag files to upload!</span>
                  </div>
                </DragDiv>
              </label>

              <div className="divide-y text-gray-700 py-1">
                {files.map(({ file, url }, i) => (
                  <div
                    key={url}
                    className="flex py-2 items-center justify-between space-x-2"
                  >
                    <div className="flex space-x-3 items-baseline min-w-0">
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="leading-none truncate min-w-0 text-sm cursor-pointer hover:underline focus:underline focus:outline-none text-blue-500"
                        title={file.name}
                      >
                        {file.name}
                      </a>
                      <div className="text-xs leading-none text-gray-500">
                        {bytesToHumanReadable(file.size)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFiles((files) => [
                          ...files.slice(0, i),
                          ...files.slice(i + 1, files.length),
                        ]);
                      }}
                      title={`Remove ${file.name}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="red"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {error && (
                <div
                  role="alert"
                  className="text-sm p-3 border-2 rounded-lg border-red-400 bg-red-200 text-red-700 mt-3"
                >
                  {error}
                </div>
              )}
              <Button
                label="Submit Application"
                className="uppercase w-full mt-2"
                loading={loading}
                disabled={
                  !feedback || !WhatsApp || !Role || !dob || !college || !year
                }
                onClick={(e) => {
                  e.preventDefault();
                  submitForm();
                }}
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;
